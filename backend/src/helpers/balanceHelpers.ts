export function createSpendIdSqlString(ids: string[]): {
  concat: string;
  values: string[];
} {
  let sqlConcat: string = '';
  let sqlConcatValues: string[] = [];
  let count: number = 2;

  for (let i: number = 0; i < ids.length; i++) {
    if (i !== ids.length - 1) {
      sqlConcat += `id = $${count} OR `;
      count++;
    } else {
      sqlConcat += `id = $${count} `;
    }
    sqlConcatValues.push(ids[i]);
  }

  return { concat: sqlConcat, values: sqlConcatValues };
}
