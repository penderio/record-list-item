module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RecordListItem',
      externals: {
        react: 'React'
      }
    }
  }
}
