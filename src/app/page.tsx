"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo-section">
            <h1 className="logo-text">FOX SIM</h1>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#" className="nav-item">Início</a>
            <a href="#" className="nav-item">Sobre</a>
            <a href="#" className="nav-item">Pilotos</a>
            <a href="#" className="nav-item">ATC</a>
            <a href="#" className="nav-item">Notícias</a>
            <a href="#" className="nav-item">Eventos</a>
            <a href="#" className="nav-item">Recursos</a>
            <a href="#" className="nav-item">Comunidade</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay"></div>

          {/* Animated Background Elements */}
          <div className="animated-bg">
            <div className="radar-circle"></div>
            <div className="plane plane-1">✈</div>
            <div className="plane plane-2">✈</div>
            <div className="plane plane-3">✈</div>
          </div>

          <div className="container hero-content">
            <h2 className="hero-title">BEM-VINDO À FOX SIM AVIATION</h2>
            <p className="hero-subtitle">Voe mais alto com a maior comunidade de simulação aérea.</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">PILOTOS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">120</span>
                <span className="stat-label">CONTROLADORES</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">OPERAÇÕES</span>
              </div>
            </div>
            <a href="#" className="btn btn-primary hero-cta">JUNTE-SE A NÓS</a>
          </div>
        </section>

        {/* News Section */}
        <section className="section news-section">
          <div className="container">
            <h3 className="section-title">ÚLTIMAS NOTÍCIAS</h3>
            <div className="grid-3">
              {[1, 2, 3].map((i) => (
                <article key={i} className="card news-card">
                  <div className="card-image-placeholder">
                    {/* Placeholder for news images */}
                  </div>
                  <div className="card-content">
                    <span className="card-date">14 DEZ 2025</span>
                    <h4>Abertura das Inscrições para o Evento de Natal</h4>
                    <p>Confira os detalhes da nossa rota especial de fim de ano.</p>
                    <a href="#" className="read-more">Ler mais →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="section events-section">
          <div className="container">
            <h3 className="section-title">PRÓXIMOS EVENTOS</h3>
            <div className="events-list">
              <div className="event-item">
                <div className="event-date">
                  <span className="day">20</span>
                  <span className="month">DEZ</span>
                </div>
                <div className="event-info">
                  <h4>Ponte Aérea Rio-SP</h4>
                  <p>18:00z - 22:00z | SBGL - SBSP</p>
                </div>
                <a href="#" className="btn btn-outline btn-sm">Detalhes</a>
              </div>
              <div className="event-item">
                <div className="event-date">
                  <span className="day">27</span>
                  <span className="month">DEZ</span>
                </div>
                <div className="event-info">
                  <h4>Fly-in Nordeste</h4>
                  <p>19:00z - 23:00z | SBFZ - SBSV</p>
                </div>
                <a href="#" className="btn btn-outline btn-sm">Detalhes</a>
              </div>
            </div>
          </div>
        </section>

        {/* Community Pillars */}
        <section className="section pillars-section">
          <div className="container">
            <h3 className="section-title">NOSSOS PILARES</h3>
            <div className="grid-4">
              <div className="pillar-card">
                <div className="pillar-icon">✈️</div>
                <h3>Pilotos</h3>
                <p>Treinamento e certificação para todos os níveis.</p>
              </div>
              <div className="pillar-card">
                <div className="pillar-icon">🎧</div>
                <h3>ATC</h3>
                <p>Controle de tráfego aéreo realista e profissional.</p>
              </div>
              <div className="pillar-card">
                <div className="pillar-icon">🌐</div>
                <h3>Eventos</h3>
                <p>Eventos regulares cobrindo todo o território nacional.</p>
              </div>
              <div className="pillar-card">
                <div className="pillar-icon">📚</div>
                <h3>Academia</h3>
                <p>Material didático completo e instrutores dedicados.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col">
            <h5>FOX SIM</h5>
            <p>Conectando entusiastas da aviação virtual.</p>
          </div>
          <div className="footer-col">
            <h5>Links Rápidos</h5>
            <a href="#">Sobre Nós</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
          <div className="footer-col">
            <h5>Social</h5>
            <div className="social-links">
              <a href="#">Discord</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Fox Sim Aviation. Todos os direitos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        /* Reset & Base is in globals.css */
        
        .navbar {
          background: rgba(13, 18, 30, 0.95);
          height: 70px;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .nav-container {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #fff;
          margin: 0;
          background: none;
          -webkit-text-fill-color: #fff;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-item {
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.8;
          color: white;
          text-decoration: none;
          transition: 0.3s;
        }

        .nav-item:hover {
          opacity: 1;
          color: var(--primary);
        }

        .mobile-menu-btn {
          display: none;
          font-size: 1.5rem;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Hero */
        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          /* Updated Layout using a more technical/aviation background */
          background: #0f172a; 
          /* Real Cockpit Image */
          background-image: 
            linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.8)),
            url('https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=2074&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          margin-top: -70px;
          padding-top: 70px;
          overflow: hidden;
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        /* Radar Effect */
        .radar-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          animation: radarPulse 4s infinite linear;
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.05);
        }
        
        .radar-circle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 50%;
        }

        /* Moving Planes */
        .plane {
          position: absolute;
          color: rgba(255, 255, 255, 0.4);
          font-size: 1.5rem;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          z-index: 2;
        }

        .plane-1 {
          top: 20%;
          left: -10%;
          animation: flyOver 15s linear infinite;
          transform: rotate(15deg);
        }

        .plane-2 {
          top: 60%;
          left: -10%;
          animation: flyOver 20s linear infinite 5s;
          font-size: 1rem;
          transform: rotate(-10deg);
        }

        .plane-3 {
          top: 80%;
          left: -10%;
          animation: flyOver 18s linear infinite 2s;
          font-size: 1.2rem;
          transform: rotate(5deg);
        }

        @keyframes radarPulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.1); }
          70% { box-shadow: 0 0 0 100px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        @keyframes flyOver {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { left: 110%; opacity: 0; }
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /* Stronger gradient for text readability and premium look */
          background: radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(2, 6, 23, 0.95) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          color: white;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
          background: none;
          -webkit-text-fill-color: initial;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #94a3b8;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          /* Glassmorphism for stats */
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #cbd5e1;
        }

        .hero-cta {
          padding: 16px 48px;
          font-size: 1.2rem;
          border-radius: 50px;
          background: var(--primary);
          color: white;
          border: none;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }

        /* Sections */
        .section {
          padding: 5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
          z-index: 5;
        }

        .section-title {
          margin-bottom: 3rem;
          font-size: 2rem;
          position: relative;
          display: inline-block;
          color: white;
        }

        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 50%;
          height: 3px;
          background: var(--primary);
        }

        /* Grids */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        /* Cards */
        .card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .card-image-placeholder {
          height: 200px;
          background: linear-gradient(45deg, #1e293b, #0f172a);
          position: relative;
        }
        
        .card-image-placeholder::after {
            content: 'FOX NEWS';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255,255,255,0.1);
            font-weight: 800;
            font-size: 1.5rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-date {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .card-content h4 {
            color: #f1f5f9;
            margin-bottom: 0.5rem;
        }

        .read-more {
          display: inline-block;
          margin-top: 1rem;
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 600;
        }

        /* Events List */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          gap: 2rem;
          transition: 0.3s;
        }
        
        .event-item:hover {
            border-color: var(--primary);
            background: rgba(30, 41, 59, 0.6);
        }

        .event-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          padding: 10px;
          border-radius: 12px;
          width: 80px;
          height: 80px;
          color: white;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
        }

        .event-date .day {
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1;
        }

        .event-date .month {
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .event-info h4 {
          margin-bottom: 0.25rem;
          color: white;
          font-size: 1.2rem;
        }
        
        .event-info p {
            color: #94a3b8;
        }

        .btn-sm {
          margin-left: auto;
          padding: 8px 16px;
          font-size: 0.9rem;
        }

        /* Pillars */
        .pillar-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          transition: 0.3s;
        }
        
        .pillar-card:hover {
            transform: translateY(-5px);
            background: rgba(30, 41, 59, 0.5);
            border-color: var(--primary);
        }
        
        .pillar-card h3 {
            color: white;
            margin-bottom: 0.5rem;
        }

        .pillar-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }

        /* Footer */
        .footer {
          background: #020617;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 4rem 0 2rem;
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-col h5 {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          color: white;
          font-weight: 700;
        }

        .footer-col a {
          display: block;
          margin-bottom: 0.8rem;
          color: #64748b;
          transition: 0.3s;
        }

        .footer-col a:hover {
          color: var(--primary);
          transform: translateX(5px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: #475569;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: #0f172a;
            flex-direction: column;
            padding: 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .nav-links.open {
            display: flex;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 2rem;
          }
          
          .grid-3, .grid-4 {
              grid-template-columns: 1fr;
          }
          
          .event-item {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
          }
          
          .btn-sm {
              margin-left: 0;
              width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
