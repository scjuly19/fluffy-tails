import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="loader">
      <ThreeCircles color={"var(--primary-color)"} />
    </div>
  );
};
export default Loader;