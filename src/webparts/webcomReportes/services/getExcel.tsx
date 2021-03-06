import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import * as XLSX from 'xlsx';
import { IFileInfo } from '@pnp/sp/files';

export async function getExcel(file: IFileInfo, state) {
  const sp = spfi().using(SPFx(state.context));

  try {
    //! fetch del archivo
    let buffer = await sp.web
      .getFileByServerRelativePath(file.ServerRelativeUrl)
      .getBuffer();
    //! lectura del archivo con lib https://github.com/sheetjs/sheetjs
    let wb = XLSX.read(buffer, {
      type: 'buffer',
    });
    let sheetNames = wb.SheetNames;
    //! conversion de sheet a json
    let sheets: XLSX.WorkSheet[] = sheetNames.map((sheetName) => {
      return {
        name: sheetName,
        sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
      };
    });

    //! nuevo libro y nueva tabla para visualizar
    let newWb = XLSX.utils.book_new();

    //! iteracion por entidad
    state.user.Entidades.map((entidad) => {
      //! iteracion por sheet
      sheets.map((sheet) => {
        let newSheet = sheet.sheet.filter(
          (row) => Number(row.ENTIDAD) == entidad.Entidad
        );
        //! condicion de que la tabla no tiene valores vacios
        if (newSheet.length != 0) {
          //* acciones para descarga
          let xlsxSheet = XLSX.utils.json_to_sheet(newSheet);
          let sheetName = `${entidad.Entidad} ${sheet.name}`.slice(0, 30);
          XLSX.utils.book_append_sheet(newWb, xlsxSheet, sheetName);
        }
      });
    });

    //! validacion de que el reporte tiene registros
    if (!newWb.SheetNames.length) {
      throw 'Este reporte no encuentra registros para las entidades que tiene asignadas';
    } else {
      //! metodo para saltear la interceptacion de data de sharepoint
      var wbout = XLSX.write(newWb, { bookType: 'xlsx', type: 'binary' });
      let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      let url = URL.createObjectURL(blob);
      //! let blob;
      let link = document.createElement('a');
      link.href = url;
      link.download = file.Name;
      link.style.visibility = 'hidden';
      link.dataset.interception = 'off';
      link.click();
    }
  } catch (error) {
    throw error;
  }
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}
