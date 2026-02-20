'use client'
import Image from 'next/image'
import styles from '../landing/landing.module.css'

/*export const metadata = {
  title: 'Free Web Design Consultation — Honeyfoot Digital Co.',
  description: 'Boutique web development partner for high-performance websites. Design, development, SEO, and maintenance — all under one roof. Hollywood, FL.',
}*/

export default function FreeConsultationPage() {
  return (
    <div className={styles.page}>

      {/* TOPBAR */}
      <header className={styles.topbar}>
        <div className={styles.topbarLogo}>
          <Image src="/HDC-Logo.webp" alt="Honeyfoot Digital Co." width={120} height={44} />
        </div>
        <div className={styles.topbarRight}>
          <a href="tel:3057070889" className={styles.topbarPhone}>
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (305) 707-0889
          </a>
          <a href="tel:3057070889" className={styles.btnSm}>Call Now</a>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <svg className={styles.globe} viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#2dd4bf" strokeWidth="0.8"/>
          <ellipse cx="200" cy="200" rx="180" ry="55" stroke="#2dd4bf" strokeWidth="0.8"/>
          <ellipse cx="200" cy="200" rx="180" ry="108" stroke="#2dd4bf" strokeWidth="0.6"/>
          <ellipse cx="200" cy="200" rx="55" ry="180" stroke="#2dd4bf" strokeWidth="0.8"/>
          <ellipse cx="200" cy="200" rx="108" ry="180" stroke="#2dd4bf" strokeWidth="0.6"/>
          <line x1="200" y1="20" x2="200" y2="380" stroke="#2dd4bf" strokeWidth="0.6"/>
          <line x1="20" y1="200" x2="380" y2="200" stroke="#2dd4bf" strokeWidth="0.6"/>
          <circle cx="200" cy="200" r="4" fill="#2dd4bf"/>
          <line x1="200" y1="200" x2="298" y2="118" stroke="#4ade80" strokeWidth="1.2"/>
          <circle cx="298" cy="118" r="3.5" fill="#4ade80"/>
        </svg>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}><span className={styles.dot}></span>Boutique Web Dev · Boca Raton, FL</div>
          <h1>Websites That Win<br/>Clients <em>While You Sleep</em></h1>
          <p className={styles.heroSub}>From WordPress to custom React. We build fast, beautiful, high-performance websites that turn visitors into customers. Design, development, SEO, and maintenance, all under one roof.</p>
          <div className={styles.heroCtas}>
            <a href="tel:3057070889" className={styles.btnPrimary}>
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call for a Free Consultation
            </a>
            <a href="mailto:hello@honeyfootco.com" className={styles.btnGhost}>
              Email Us Instead
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              React &amp; Wordpress Experts
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              SEO Built-In
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              Ongoing Maintenance
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <div className={styles.proof}>
        <div className={styles.proofInner}>
          <div className={styles.pstat}><div className={styles.pnum}>100%</div><div className={styles.plbl}>Custom Builds</div></div>
          <div className={styles.psep}></div>
          <div className={styles.pstat}><div className={styles.pnum}>5★</div><div className={styles.plbl}>Client Satisfaction</div></div>
          <div className={styles.psep}></div>
          <div className={styles.pstat}><div className={styles.pnum}>React</div><div className={styles.plbl}>Blazing Fast Stack</div></div>
          <div className={styles.psep}></div>
          <div className={styles.pstat}><div className={styles.pnum}>1 Call</div><div className={styles.plbl}>To Get Started</div></div>
        </div>
      </div>

      {/* SERVICES */}
      <section className={styles.services}>
        <div className={styles.secHdr}>
          <div className={styles.secLbl}>What We Do</div>
          <h2 className={styles.secTitle}>Everything Your Website Needs</h2>
        </div>
        <div className={styles.svcGrid}>
          <div className={styles.svcCard}>
            <div className={styles.svcIco} style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></div>
            <div className={styles.svcName}>Lightning Fast React Sites</div>
            <p className={styles.svcDesc}>Whether you need a powerful, flexible WordPress site built to grow with your business, or a blazing-fast custom React build that loads instantly, your site will be built with cutting-edge technology and look stunning on every device.</p>
          </div>
          <div className={styles.svcCard}>
            <div className={styles.svcIco} style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <div className={styles.svcName}>Get Found Online</div>
            <p className={styles.svcDesc}>Strategic SEO and blog content that puts you on the map. We help customers discover your business when they search for what you offer.</p>
          </div>
<br className="desktop-break" />
          <div className={styles.svcCard}>
            <div className={styles.svcIco} style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>
            <div className={styles.svcName}>Worry-Free Maintenance</div>
            <p className={styles.svcDesc}>Monthly security checks, updates, and reliable hosting. Sleep easy knowing your site is protected, backed up, and performing at its best.</p>
          </div>
          <div className={styles.svcCard}>
            <div className={styles.svcIco} style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
            <div className={styles.svcName}>E-Commerce That Converts</div>
            <p className={styles.svcDesc}>We build online stores on BigCommerce, Shopify, Squarespace, or WordPress. Whatever platform fits your needs, we&apos;ve got the expertise.</p>
          </div>
          <div className={styles.svcCard}>
            <div className={styles.svcIco} style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></div>
            <div className={styles.svcName}>Strategic Consultation</div>
            <p className={styles.svcDesc}>Not sure where to start? Book a consultation and we&apos;ll map out the perfect digital strategy for your business goals and budget.</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className={styles.why}>
        <div className={styles.whyInner}>
          <div className={styles.whyLeft}>
            <h2>Why Businesses Choose <span>Honeyfoot</span></h2>
            <p>We&apos;re a boutique studio. This means you work directly with the people building your site. No account managers, no handoffs. Just a dedicated team with over a decade of experience that treats your project like their own.</p>
            <ul className={styles.points}>
              <li className={styles.point}><div className={styles.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div><div className={styles.ptxt}><strong>WordPress experts since 2015</strong> — over a decade of builds across e-commerce, real estate, fitness, non-profit, and more.</div></li>
              <li className={styles.point}><div className={styles.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div><div className={styles.ptxt}><strong>React & modern JavaScript</strong> — we evolved with the web and now build blazing-fast custom React sites alongside WordPress.</div></li>
              <li className={styles.point}><div className={styles.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div><div className={styles.ptxt}><strong>Direct access to your developer</strong> — no middlemen, no communication gaps.</div></li>
              <li className={styles.point}><div className={styles.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div><div className={styles.ptxt}><strong>Concept to launch, start to finish</strong> — design, dev, hosting, SEO, and maintenance all handled.</div></li>
              <li className={styles.point}><div className={styles.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div><div className={styles.ptxt}><strong>Local South Florida team</strong> — Hollywood, FL based and available when you need us.</div></li>
            </ul>
          </div>
          <div className={styles.whyRight}>
            <div className={styles.testimonial}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>&ldquo;HoneyFoot Digital Co. excels at turning your website dreams into reality. They have been professional, detail-oriented, and competent throughout the process of our collaboration. We appreciate their dedication to the project, customer service and their prompt delivery.&rdquo;</p>
              <div className={styles.author}>— Happy Client, Chicago</div>
            </div>
            <a href="tel:3057070889" className={styles.btnPrimary} style={{justifyContent:'center'}}>
              <svg viewBox="0 0 24 24" style={{width:16,height:16,stroke:'currentColor',fill:'none',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Get a Free Consultation
            </a>
            <div className={styles.loc}>
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Hollywood, FL 33020 · hello@honeyfootco.com
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.final}>
        <div className={styles.finalInner}>
          <h2>Ready to Build Something <span>Great?</span></h2>
          <p>One call is all it takes. Tell us about your project and we&apos;ll put together a plan — no pressure, no obligation.</p>
          <a href="tel:3057070889" className={styles.phoneBig}>
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (305) 707-0889
          </a>
          <span className={styles.phoneHint}>Tap to call · Mon–Fri</span>
          <a href="tel:3057070889" className={styles.btnPrimary} style={{fontSize:'0.95rem',padding:'16px 36px'}}>
            Call for Your Free Consultation
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.flogo}>
          <Image src="/HDC-Logo.webp" alt="Honeyfoot Digital Co." width={120} height={36} />
        </div>
        <div className={styles.finfo}>
          2719 Hollywood Blvd Suite 530, Hollywood, FL 33020<br/>
          <a href="tel:3057070889">(305) 707-0889</a> &nbsp;·&nbsp; <a href="mailto:hello@honeyfootco.com">hello@honeyfootco.com</a><br/>
          <span style={{marginTop:5,display:'inline-block',fontSize:'0.7rem'}}>Copyright © 2026 Honeyfoot Digital Company, LLC</span>
        </div>
      </footer>

    </div>
  )
}
