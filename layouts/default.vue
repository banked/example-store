<template>
  <div>
    <nuxt />
    <footer>
      Banked.com example store, <a href="https://github.com/banked/example-store">source code</a> released under an MIT license
    </footer>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

footer {
  margin: 60px auto 30px;
  max-width: 1200px;
}

a {
  text-decoration: underline
}

a:hover {
  text-decoration: none;
}
</style>
