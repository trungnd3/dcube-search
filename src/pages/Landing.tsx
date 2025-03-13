import Layout from '../components/layout/Layout';

export default function LandingPage() {
  return (
    <Layout>
      <div className='text-center w-full'>
        <h1 className='font-extrabold text-primary text-6xl my-6'>
          Search Portal for everybody
        </h1>
        <div className='pt-20 font-medium text-3xl flex gap-2 flex-col md:flex-row justify-center'>
          <p>Ask what you want.</p>
          <p>Get answer quick.</p>
        </div>
      </div>
    </Layout>
  );
}
