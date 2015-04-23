/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.sql;

/**
 *
 * @author KEDAC
 */
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Miembro {

    private ResultSet rs;
    private Statement stm = null;
    private static Miembro miembro;

    private Miembro(Statement pStm) {
        this.stm = pStm;
    }

    public synchronized static Miembro getInstance() {
        if (miembro == null) {
            miembro = new Miembro(SQLServer.getInstance("sa", "123", "RegistroNotas", "localhost").getStm());
        }
        return miembro;
    }

    public ArrayList<String> miembrosGrupo(String pCodigo) throws SQLException {
        ArrayList<String> miembros = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_MiembrosGrupo '%s'", pCodigo));
        while (rs.next()) {
            miembros.add(rs.getString("Nombre"));
        }
        return miembros;
    }

    public ArrayList<String> reportesMiembrosGrupo(String pCodigo) throws SQLException {
        ArrayList<String> reportes = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_ReporteMiembros '%s'", pCodigo));
        while (rs.next()) {
            reportes.add(rs.getString("Email"));
            reportes.add(rs.getString("Codigo"));
            reportes.add(rs.getString("Nombre"));
            reportes.add(rs.getString("NotaAcumulada"));
        }
        return reportes;
    }

    public ArrayList<String> reporteMiembroGrupo(String pCodigo, String pNombre) throws SQLException {
        ArrayList<String> reporte = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_ReporteMiembro '%s', '%s'", pCodigo, pNombre));
        while (rs.next()) {
            reporte.add(rs.getString("Email"));
            reporte.add(rs.getString("Codigo"));
            reporte.add(rs.getString("Nombre"));
            reporte.add(rs.getString("NotaAcumulada"));
        }
        return reporte;
    }

    public void actualizarNota(String pCodigo, String pNombre, String pEvaluacion, String pInstancia, float pNotaS) throws SQLException {
        String pNota = pNotaS + "";
        try {
            this.stm.executeQuery(String.format("dbo.RNSP_ActualizarNota '%s', '%s', '%s', '%s', '%s'", pCodigo, pNombre, pEvaluacion, pInstancia, pNota));
        } catch (Exception e) {
            System.out.println(e);
        }
    }
    
    public void actualizarNotaAcumulada(String pEstudiante, String pGrupo) {
        try {
            this.stm.executeQuery(String.format("dbo.RNSP_ActualizarNotaAcumulada '%s', '%s'", pEstudiante, pGrupo));
        } catch (Exception e) {
            System.out.println(e);
        }        
    }
}
