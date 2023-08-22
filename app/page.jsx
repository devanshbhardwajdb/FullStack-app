import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      <div className="">Welcome to Twikker</div>
      {/* <br className='max-md:hidden' /> */}
      <span className='blue_gradient text-center'> Tweek your thoughts</span>
    </h1>
    <p className='desc text-center'>
      Twikker is an open-source prompting tool for modern world to
      discover, create and share creative tweeks.
    </p>

    <Feed />
  </section>
);

export default Home;