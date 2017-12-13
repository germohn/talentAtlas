import Api from './Api';

class ApiActions {

  static queryAllSkills() {
    return Api.post('MATCH (c:concept) RETURN collect (c.name)')
      .then(result => result.data[0][0]);
  }

  static queryRolesWithSkills() {
    return Api.post('MATCH (k:Kompetents)-->(c:concept) return k.name, collect(c.name) as SeotudM6isted')
      .then(result => result.data);
  }

  static queryWithSkills(skills) {
    if (skills.length > 0) {
      return Api.post('MATCH (c:concept)-[x]-(p:Person)\n' +
        'WHERE c.name in [\'' + skills.join('\',\'') + '\']\n' +
        'WITH p,\n' +
        '   collect(c.name) as Kompetentse,\n' +
        '   count(x) as seoseid,\n' +
        '   sum(x.level) as punkte\n' +
        '   order by seoseid desc\n' +
        '   return p.name, seoseid, punkte, Kompetentse')
        .then(result => result.data);
    } else {
      return Promise.resolve([]);
    }

  }
}

export default ApiActions;