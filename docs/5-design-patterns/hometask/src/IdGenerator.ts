class IdGenerator {
  private static _instance: IdGenerator = new IdGenerator();

  private _id: number = 0;

  constructor() {
    if(IdGenerator._instance){
      return IdGenerator._instance;
    }
    IdGenerator._instance = this;
  }
  createId = () => this._id++;
}

export default IdGenerator;
