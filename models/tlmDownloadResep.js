const { db } = require('../helpers/DBUtil')

const getResep = async (param) => {

    const query = {
        sql :   ' SELECT rm.id_rm, ' +
                ' r.*, ' +
                ' o.*, ' +
                ' d.nama_dokter, d.sip_dokter, ' +
                ' k.nama_kota, ' +
                ' faskes.nama_provider AS namaFaskes, faskes.alamat_provider AS alamatFaskes, ' +
                ' p.nama_pasien, p.tgllahir_pasien, p.alamat_pasien  ' +
                ' FROM resume_medis rm ' +
                ' LEFT JOIN resep_obat r ON r.id_rm = rm.id_rm ' +
                ' LEFT JOIN obat o ON o.id_obat = r.id_obat ' +
                ' LEFT JOIN konsultasi konsul ON konsul.id_konsultasi = rm.id_konsultasi ' +
                ' LEFT JOIN dokter d ON d.id_dokter = konsul.dok_id_dokter ' +
                ' LEFT JOIN kota k ON k.id_kota = d.id_kota ' +
                ' LEFT JOIN provider faskes ON faskes.id_provider = d.id_provider ' +
                ` LEFT JOIN pasien p ON p.id_pasien = rm.id_pasien WHERE rm.id_rm = '${param.id_rm}' `,
    }

    // query.sql += ' ORDER BY a.id_dokter ASC' 

    const results =  await db.run(query)
    const rows = results[0].map(row => row.toJSON());
        let data  = rows
        return data
}

module.exports = { getResep }