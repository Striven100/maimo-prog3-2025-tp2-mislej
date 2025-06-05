import MoviesGrid from './MoviesGrid';

const HomeContainer = () => {
  return (
    <div className="home_container">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--color-accent)' }}>
        Te damos la bienvenida
      </h1>
      <MoviesGrid />
    </div>
  );
};

export default HomeContainer;