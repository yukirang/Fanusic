const encoded64 = base => {
  if (typeof window === 'object' && window.btoa) {
    return window.btoa(base);
  } else {
    return new Buffer.from(base).toString('base64');
  }
};

module.exports = encoded64;
