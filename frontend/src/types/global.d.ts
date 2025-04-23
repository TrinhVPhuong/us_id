export {}

declare global {
  interface Window {
    _loginConfig: {
      backgroundImage: string
      [key: string]: string
    }
  }
}
