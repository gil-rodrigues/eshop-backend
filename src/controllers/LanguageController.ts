import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ILanguageRepository from 'repositories/ILanguageRepository';

class LanguageController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;

    const languageRepository =
      container.resolve<ILanguageRepository>('LanguageRepository');

    const language = await languageRepository.findByCode(code);

    return res.json(language);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { code, name } = req.body;

    const languageRepository =
      container.resolve<ILanguageRepository>('LanguageRepository');

    const language = await languageRepository.create(code, name);

    return res.json(language);
  }
}

export default LanguageController;
