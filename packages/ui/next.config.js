module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/ds/:path*',
        destination: 'http://localhost:4000/ds/:path*',
      
      },
    //   {
    //     source: '/ds/test',
    //     destination: 'http://localhost:4000/ds/test',
    //   },
    ];
  };
  return {
    rewrites,
  };
};
