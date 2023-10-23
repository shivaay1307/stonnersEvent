import React, { useEffect, useState, useRef, createRef } from "react";
import { SplitText } from "../Gsap/SplitText";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../assets/images/loading.svg";
import { useStaticQuery, graphql } from "gatsby";

function Event() {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark {
        frontmatter {
          videos {
            title
            description
            url
          }
        }
      }
    }
  `);

  const [single, setSingle] = useState([]);
  const videoRefs = useRef([]);
  const observer = useRef(null);

  useEffect(() => {
    setSingle(data.markdownRemark.frontmatter.videos);
  }, [data]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (single.length > 0) {
      videoRefs.current = Array(single.length)
        .fill()
        .map((_, i) => videoRefs.current[i] || createRef());

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              if (loading) {
                setLoading(false);
              }
              playVideo(index);
            } else {
              pauseVideo(index);
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );

      videoRefs.current.forEach((videoRef) => {
        if (videoRef.current) {
          observer.current.observe(videoRef.current);
        }
      });

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [single, loading]);

  const playVideo = (index) => {
    if (videoRefs.current[index].current) {
      videoRefs.current[index].current.play();
    }
  };

  const pauseVideo = (index) => {
    if (videoRefs.current[index].current) {
      videoRefs.current[index].current.pause();
    }
  };

  return (
    <div className="row justify-content-between text-center">
      {single.length !== 0
        ? single.map((i, n) => {
            return (
              <div key={n} className="col-sm-5 p-4 video-container">
                <iframe
                  className="tiles-videos"
                  src={
                    loading === true ? Loading : `${i?.url}?autoplay=1&mute=1`
                  }
                  title={i?.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
                <div className="event-content">
                  <h4>{i?.title}</h4>
                  <SplitText by="WORD" as="i" animate>
                    {i?.description}
                  </SplitText>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Event;
