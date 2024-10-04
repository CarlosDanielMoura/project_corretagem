import { FormCustom } from "../../components/FormCustom";
import img_back from "../../assets/img_system_coffe_back.svg";
import img_front from "../../assets/img_system_coffe_front.svg";
const Login = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex">
      <div className="flex-1 flex justify-center items-center">
        <FormCustom type="login" />
      </div>
      <div className="flex-1 bg-login-secudary relative">
        <img
          src={img_back}
          alt="login"
          className="relative object-fill w-full h-full"
        />
        <img
          className="absolute top-[15%] "
          src={img_front}
          alt="login front"
        />
      </div>
    </div>
  );
};
export { Login };
