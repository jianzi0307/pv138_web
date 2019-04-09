import Http from './http';

class DataService {
  public static readonly instance: DataService = new DataService();
  private constructor() { }

  public getUserCompScore(compId: string, userId: number) {
    return Http.instance.post('comp/score', {
      compId,
      userId
    });
  }
}
export default DataService;
