import React from 'react';
import { Typography, Carousel } from 'antd';
import './About.css';

const { Title, Paragraph } = Typography;

const AboutSlide = ({ title, paragraphs, image, video, reverse, gap }) => (
  <div
    className="about-content about-fadein"
    style={{
      ...(reverse ? { flexDirection: 'row-reverse' } : {}),
      ...(gap ? { gap } : {}),
      minHeight: '60vh',
      maxHeight: '90vh',
      width: '90vw',
      maxWidth: 900,
      margin: '0 auto',
      padding: '3rem 2.5rem',
      borderRadius: 18,
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      background: 'rgba(0,0,0,0.18)',
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      zIndex: 2,
      // Responsive overrides
      ...(window.innerWidth <= 900
        ? {
            flexDirection: 'column',
            padding: '2rem 1.2rem',
            gap: '1.5rem',
            minHeight: '60vh',
            width: '98vw',
          }
        : {}),
      ...(window.innerWidth <= 600
        ? {
            padding: '1.2rem 0.5rem',
            gap: '1rem',
            minHeight: '50vh',
            width: '100vw',
            borderRadius: 0,
          }
        : {}),
    }}
  >
    <div className="LeftAbout" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Title level={2} className="about-title">{title}</Title>
      {paragraphs.map((text, idx) => (
        <Paragraph className="about-paragraph" key={idx}>
          {text}
        </Paragraph>
      ))}
    </div>
    <div className="RightAbout" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {video ? (
        <video
          src={video}
          controls
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: window.innerWidth <= 900 ? '90vw' : reverse ? 1200 : 900,
            minWidth: 0,
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            objectFit: 'cover',
            zIndex: 2,
            position: 'relative',
            margin: window.innerWidth <= 900 ? '1.5rem auto 0 auto' : reverse ? '0 auto 0 0' : '0 auto',
            display: 'block'
          }}
        />
      ) : (
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: window.innerWidth <= 900 ? '90vw' : reverse ? 1200 : 900,
            minWidth: 0,
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            objectFit: 'cover',
            zIndex: 2,
            position: 'relative',
            margin: window.innerWidth <= 900 ? '1.5rem auto 0 auto' : reverse ? '0 auto 0 0' : '0 auto',
            display: 'block'
          }}
        />
      )}
    </div>
  </div>
);

const About = () => {
  // Get navbar height for responsive offset
  const navbarHeight = window.innerWidth <= 768 ? 80 : 120;

  return (
    <div
      style={{
        ...styles.container,
        minHeight: '100vh',
        paddingTop: navbarHeight,
        boxSizing: 'border-box',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
      }}
      className="about-container"
    >
      <div style={styles.darkOverlay}></div>
      <div style={{
        width: '100vw',
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <Carousel
          className="about-carousel"
          dots
          effect="scrollx"
          autoplay
          style={{
            width: '100vw',
            minHeight: `calc(100vh - ${navbarHeight}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <AboutSlide
            title="About GuMorning"
            paragraphs={[
              "A multifaceted cafe and pop-up concept space, dedicated to creating unique experiences that resonate with the Novo Vizcayano community.",
              "Inclusive at its core and encouraging indivual in every visit."
            ]}
            image="https://scontent.fmnl17-7.fna.fbcdn.net/v/t51.75761-15/487454242_17889879585219780_7244560314377680406_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHlCp0rwier-njMtzU93cZq0BAnBJGbzqvQECcEkZvOq_VIn3_UqrTksl58XPXLj8JSksUWFiKr-F8vEvXqfhnN&_nc_ohc=e0kXOByenFMQ7kNvwEp4kSv&_nc_oc=Adk8C1Pccc0iJL9JvPZntPJlzxsFtxG1vkmG6QdwKQblP9Br3_gOrMBD13Fjzhc4FFY&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=J1BuFdN1kwOd_R5qLLlckg&oh=00_AfLNrysVeQof7mZk-C0btyzAdrNELnSWvRz_H4lq2H2LAA&oe=683CE7F1"
          />
          <AboutSlide
            image="https://scontent.fmnl17-8.fna.fbcdn.net/v/t51.75761-15/485658558_17888713791219780_2215569995491022081_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHuuTYdjI38NS7jmGlW--wfIHLMzFpP0ucgcszMWk_S5-Y0feJQMBkGkaCm3UXudYrrsJxzUAKEkzkxpQJis3Pi&_nc_ohc=TXmJO85zusYQ7kNvwE0u15t&_nc_oc=AdlSx0dopL-o6hugiXZC-zV_rrbBZ3ROZbVKZb0iqqbOhCmJOsZEPS9kjz-lpVxPqIY&_nc_zt=23&_nc_ht=scontent.fmnl17-8.fna&_nc_gid=XBbhiFErKo4HmBsuJqbUUg&oh=00_AfI6cu1VMzagbN_2-WGb73hCrMrEYkQjXSHTJyQ4kRhnZQ&oe=683E3DCA"
            title="About Gumorning"
            paragraphs={[
              "Nurturing an Inclusive Comminity. Championing Individuality. Deeply Rooted in Supporting Local.",
              "Whether you're stopping by for a cup of coffee or participating in one of their community events, Gumorning NV offers a welcoming space that embodies the warmth and diversity of Nueva Vizcaya."
            ]}
            reverse
            gap="7rem"
          />
          <AboutSlide
            title="Our Journey"
            paragraphs={[
              "Whether you're stopping by for a cup of coffee or participating in one of their community events, Gumorning NV offers a welcoming space that embodies the warmth and diversity of Nueva Vizcaya."
            ]}
            video="https://cdn.pixabay.com/video/2021/09/01/87123-601076787_large.mp4"
          />
        </Carousel>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100vw',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    backgroundImage: 'url("https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/479521569_122199922274248712_924707889322222752_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF3dAvErIvxcaPawQSyulS4LdntaQtbg8ot2e1pC1uDyjCnlpMDpXwn926pC0namsFv0VaEePaF3IsHjnxQ6cGP&_nc_ohc=gYb0pxvsPcEQ7kNvwEVd2Um&_nc_oc=AdlJgr-eESjJoNg5yXA4Www8c34ZKNH0M5cu9adwIFldRbiNt_AU08twZbjCdCwmzZY&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=ApECQFHyvHUy6i7gwcCW0g&oh=00_AfIe2hJbARqn-LHGkpNMQ4XkafrhP4YI6JBVYzUBZjU7AA&oe=683CEF5B")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 0,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.82)',
    zIndex: 1,
  },
};

export default About;
