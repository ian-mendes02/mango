import { QueryResultRow, sql } from "@vercel/postgres";
const MangoDB = {
    async query ( query: string ): Promise<QueryResultRow[]> {
        var { rows } = await sql`${query}`;
        return rows;
    }
}
export default MangoDB;