<p align="center">
  <br>
	<br>
  <a href="https://github.com/webfansplz/vtui-npm">
    <img width="180" src="./logo.svg" alt="VTui NPM logo">
  </a>
  <br>
	<br>
</p>
<p align='center'>
Interactive CLI for npm - search and install JavaScript package. Powered by <a href="https://github.com/vue-terminal/vue-termui">vue-termui</a>.
</p>


## ๐บ Preview

<p align='center'>
 <img src="./vtui-npm.gif" alt="VTui NPM">
</p>

## ๐ฅ Features

- ๐ **Powerful Search:** Search all the packages from npm and Yarn.
- ๐ผ **User Friendly:** Search and install packages with a simple keystroke.
- ๐ฆ **Powerful Installer:** Support npm ยท yarn ยท pnpm ยท bun.

## ๐ฆ Install

```sh
npm install vtui-npm
```

## ๐ฎ Usage

Open the terminal and then typing `vnpm`.

```sh
vnpm
```

```sh
# Switch to npm registry for search (algolia by default),we recommend using the algolia search.
vnpm -n | vnpm --npm
```



## ๐ Credits

- Search powered by [Algolia](https://github.com/algolia/algoliasearch-client-javascript).
- Installer powered by [@antfu/ni](https://github.com/antfu/ni).
- Terminal UI powered by [vue-termui](https://github.com/vue-terminal/vue-termui).


## ๐ License

[MIT](./LICENSE)
