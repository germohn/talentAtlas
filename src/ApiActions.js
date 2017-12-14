import Api from './Api';


// Makes object form 2 element array  -> objectify([ [1, 'a'], [2, 'b'], [3, 'c'] ]) ===  { '1': 'a', '2': 'b', '3': 'c' }
let objectify = a => a.reduce((o, [k, v]) => (o[k] = v, o), {});

class ApiActions {

  static queryAllSkillsForLeader() {
  return Api.post('MATCH (c:concept) RETURN collect (c.name)')
     .then(result => result.data[0][0]);
  }

  static queryAllSkills() {
    return Api.post('MATCH (t) \n' +
      'WHERE t:Kompetents or t:concept\n' +
      'return id(t), t.name')
      .then(result => result.data);
  }

  // static queryRolesWithSkills() {
  //   return Api.post('MATCH (k:Kompetents)-->(c:concept) return k.name, collect(id(c), c.-name) as SeotudM6isted')
  //     .then(result => result.data);
  // }
  static queryRolesWithSkills() {
    return Api.post('MATCH (k:Kompetents)-->(c:concept) \n' +
      'WITH k, collect({id: id(c), name: c.name}) as obj\n' +
      'return k.name, obj')
      .then(result => result.data);
  }

  static saveSkillQuery(object){
    console.log(object.name)
    return Api.post('MATCH (p:Person {name: \'' + object.name + '\'}), (c:concept {name: \'' +object.skillName + '\'})\n' +
      'MERGE (p)-[rel:knows_concept]->(c)\n' +
      'SET rel.level = ' +object.skillLevel  )
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

  /*static queryWithSkills(skills) {
    if (skills.length > 0) {
      return Api.post('MATCH (c:concept)-[x]-(p:Person), (p)-[]->(c2:concept)\n' +
        'WHERE c.name in [\'' + skills.join('\',\'') + '\']\n' +
        'WITH p,\n' +
        '   {paringu_vastuseid: collect(c.name), \n' +
        '   vastuste_arv: count(x), \n' +
        '   sobivus_summa: sum(x.level) } as Sobivus, \n' +
        '   collect(c2.name) as MuudKompetentsid \n' +
        '   RETURN p.name, Sobivus, MuudKompetentsid')
        .then(result => result.data);
    } else {
      return Promise.resolve([]);
    }

  }*/
}

export default ApiActions;