<template>
  <div>
    <nuxt />
    <footer class="clearfix">
      <div class="float-left">
        Banked.com example store, <a href="https://github.com/banked/example-store">source code</a> released under an MIT license
      </div>
      <div class="float-right">
        <a href="https://banked.com">Banked.com</a> |
        <a href="https://developer.banked.com">Developer Documentation</a> |
        <a href="https://github.com/banked/example-store#-photo-credits">Photo Credits</a>
      </div>
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

@media (min-width: 320px) and (max-width: 1024px) {
  footer {
    padding: 0 20px;
    margin: 30px auto;
  }
  footer .float-right {
    float: left;
    margin-top: 20px;
  }
}

a {
  text-decoration: underline
}

a:hover {
  text-decoration: none;
}
</style>
