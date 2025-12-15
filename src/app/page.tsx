"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo">Fox Sim</div>
          <nav className="nav-links">
            <a href="#">Início</a>
            <a href="#">Notícias</a>
            <a href="#">Eventos</a>
            <a href="#">Comunidade</a>
            <a href="#" className="btn btn-primary">Login</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <h1>Fox Sim Aviation</h1>
            <p className="subtitle">A maior comunidade de simulação aérea do Brasil.</p>
            <div className="cta-group">
              <a href="#" className="btn btn-primary">Junte-se a nós</a>
              <a href="#" className="btn btn-outline">Saiba mais</a>
            </div>
          </div>
        </section>

        <section className="features container">
          <div className="feature-card">
            <h3>Eventos Semanais</h3>
            <p>Participe de voos em grupo e eventos controlados.</p>
          </div>
          <div className="feature-card">
            <h3>Treinamento</h3>
            <p>Aprenda com pilotos experientes e instrutores.</p>
          </div>
          <div className="feature-card">
            <h3>Comunidade Ativa</h3>
            <p>Interaja com milhares de entusiastas da aviação.</p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          height: var(--header-height);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          background: rgba(9, 9, 11, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .hero {
          padding: 8rem 0;
          text-align: center;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        }

        .subtitle {
          margin: 1.5rem 0 2.5rem;
          font-size: 1.25rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 4rem 0;
        }

        .feature-card {
          padding: 2rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }

        .feature-card h3 {
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }
      `}</style>
    </div>
  );
}
