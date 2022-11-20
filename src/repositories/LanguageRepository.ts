import Language from 'datasource/typeorm/entities/Language';
import { getRepository, Repository } from 'typeorm';
import ILanguageRepository from './ILanguageRepository';

class LanguageRepository implements ILanguageRepository {
  private ormRepository: Repository<Language>;

  constructor() {
    this.ormRepository = getRepository(Language);
  }

  public async findByCode(code: string): Promise<Language | undefined> {
    const language = await this.ormRepository.findOne({
      where: { code }
    });

    return language;
  }

  public async create(code: string, name: string): Promise<Language> {
    const language = this.ormRepository.create({ code, name });

    await this.ormRepository.save(language);

    return language;
  }
}

export default LanguageRepository;
