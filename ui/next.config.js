module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/ds/:path*',
        destination: 'http://localhost:4000/ds/:path*',
      },
    ];
  };
  return {
    rewrites,
  };
};
