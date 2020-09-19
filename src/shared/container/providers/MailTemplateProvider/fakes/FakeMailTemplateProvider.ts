import IMailTemplateprovider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateprovider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
