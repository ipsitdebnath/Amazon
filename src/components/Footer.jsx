import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top" onClick={() => window.scrollTo(0, 0)}>
        Back to top
      </div>
      <div className="footer-content">
        <div className="footer-col">
          <h3>Get to Know Us</h3>
          <p>About Us</p>
          <p>Careers</p>
        </div>
        <div className="footer-col">
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
        <div className="footer-col">
          <h3>Make Money with Us</h3>
          <p>Sell on Amazon</p>
          <p>Advertise</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Amazon Clone — College Project</p>
      </div>
    </footer>
  );
}

export default Footer;
