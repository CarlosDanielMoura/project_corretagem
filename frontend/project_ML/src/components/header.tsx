import img_logo from "../assets/logo_vinidici.svg";
const Header = () => {
  return (
    <header className="w-full h-16 flex items-center gap-1 bg-login-primary px-6 py-5">
      <img src={img_logo} alt="Logo da vinidici" />
      <h1 className="font-roboto text-white text-lg leading-6">Venidici</h1>
    </header>
  );
};
export { Header };
