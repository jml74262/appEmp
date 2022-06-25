export default interface ITask<ReturnType> {
  execute(): ReturnType;
}
