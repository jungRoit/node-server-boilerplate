import knex from '../db/knex';

import MODELS from '../models/models';

export const getAll = async model => {
  return await knex(MODELS[model]).select();
};

export const getBy = async (model, where) => {
  return await knex(MODELS[model])
    .select()
    .where(where)
    .first();
};

export const getAllBy = async (model, where) => {
  return await knex(MODELS[model])
    .select()
    .where(where);
};

export const insert = async (model, payload) => {
  return await knex(MODELS[model]).insert(payload);
};

export const update = async (model, payload, where) => {
  return await knex(MODELS[model])
    .update(payload)
    .where(where);
};

export const remove = async (model, where) => {
  return await knex(MODELS[model])
    .where(where)
    .del();
};
