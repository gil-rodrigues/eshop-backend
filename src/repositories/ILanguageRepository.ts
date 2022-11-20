import Language from 'datasource/typeorm/entities/Language';

interface ILanguageRepository {
  findByCode(code: string): Promise<Language | undefined>;
  create(code: string, name: string): Promise<Language>;
}

export default ILanguageRepository;
