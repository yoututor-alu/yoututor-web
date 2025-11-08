const year = new Date().getFullYear();

const FooterBar = () => (
  <footer className="w-full flex justify-center items-center py-[1.79rem] bg-deepNavy">
    <p className="text-white">&copy; {year} YouTutor. All Rights Reserved.</p>
  </footer>
);

export default FooterBar;
