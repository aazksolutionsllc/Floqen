import React from 'react'
import './Integrations.css'
import awsCognitoImg from '../assets/aws_cognito.jpg'
import microsoftAzureImg from '../assets/microsoft_azure.png'
import oktaImg from '../assets/okta.png'
import pingIdentityImg from '../assets/ping_identity.png'

function Integrations() {
  const integrations = [
    { name: 'Microsoft Azure', imageSrc: microsoftAzureImg },
    { name: 'Okta', imageSrc: oktaImg },
    { name: 'Ping Identity', imageSrc: pingIdentityImg },
    { name: 'AWS Cognito', imageSrc: awsCognitoImg },
    { name: 'Google' }
  ]

  const marqueeItems = [
    ...integrations,
    // duplicate for seamless loop
    ...integrations
  ]

  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Works Seamlessly With Your Identity Ecosystem
          </h2>
          <p className="section-subtitle">
            Integrate with leading identity platforms
          </p>
        </div>
        <div className="logo-marquee" aria-label="Supported identity providers">
          <div className="marquee-viewport">
            <div className="marquee-track">
              {marqueeItems.map((item, i) => (
                <div className="marquee-item" key={`mq-${i}-${item.name}`}>
                  <span className="marquee-name marquee-pill">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-fade-left" />
            <div className="marquee-fade-right" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Integrations

