import React, { createContext, useContext, memo, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { splitString } from './utils/splitString';

// Create a context for SplitText
const SplitTextContext = createContext({
  hasAnimationEnded: false,
  setHasAnimationEnded: () => {},
  by: 'WORD' || 'CHAR',
});

// SplitText component
export const SplitText = memo(
  ({
    as: Component = 'span', // Use Component instead of as
    by: localBy = 'WORD' || 'CHAR',
    children,
  }) => {
    const childrenBackup = useRef(children);
    const [hasAnimationEnded, setHasAnimationEnded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    // Use useContext to get the context value
    const contextValue = useContext(SplitTextContext);

    const { hasAnimationEnded: hasParentAnimationEnded, by: parentBy } = contextValue;

    const by = parentBy || localBy;

    const onAnimationEnd = () => {
      setHasAnimationEnded(true);
    };

    const { ref } = useStaggerAnimation({
      enabled: isInView, // Trigger the animation when the element is in the viewport
      targets: by === 'WORD' ? '.word' : '.char',
      onComplete: onAnimationEnd,
      by,
    });

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 } // Adjust the threshold as needed
      );

      // Observe the ref element
      const refElement = ref.current; // Store ref.current in a variable
      if (refElement) {
        observer.observe(refElement);
      }

      return () => {
        if (refElement) {
          observer.unobserve(refElement);
        }
      };
    }, [ref]);

    return (
      <Component ref={ref}> {/* Use Component instead of as */}
        <SplitTextContext.Provider value={{ hasAnimationEnded, setHasAnimationEnded, by: localBy }}>
          {hasParentAnimationEnded || hasAnimationEnded
            ? childrenBackup.current
            : React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                  return splitString(child, by);
                } else {
                  return child;
                }
              })}
        </SplitTextContext.Provider>
      </Component>
    );
  }
);

export const useStaggerAnimation = ({
  enabled,
  targets,
  onComplete,
  by,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    let context = null;

    if (enabled) {
      context = gsap.context(() => {
        gsap.from(targets, {
          duration: 0.8,
          yPercent: 70,
          skewY: 8,
          opacity: 0,
          ease: 'back',
          stagger: by === 'WORD' ? { each: 0.03, from: 'start' } : 0.03,
          onComplete,
        });
      }, ref);
    }

    return () => {
      if (context) {
        context.revert();
      }
    };
  }, [enabled, targets, onComplete, by]);

  return { ref };
};
