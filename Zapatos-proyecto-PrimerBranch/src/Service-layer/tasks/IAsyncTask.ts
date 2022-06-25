export default interface IAsyncTaks<ReturnType> {
  execute(): Promise<ReturnType>;
}
