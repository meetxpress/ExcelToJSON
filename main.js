// $(document).ready(function () {
//     $("#fileUploader").change(function (evt) {
//         var selectedFile = evt.target.files[0];
//         var reader = new FileReader();
//         reader.onload = function (event) {
//             var data = event.target.result;
//             var workbook = XLSX.read(data, {
//                 type: 'binary'
//             });
//             workbook.SheetNames.forEach(function (sheetName) {
//                 var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//                 var json_object = JSON.stringify(XL_row_object);
//                 document.getElementById("result").innerHTML = json_object;
//             })
//         };
//         reader.onerror = function (event) {
//             console.error("File could not be read! Code " + event.target.error.code);
//         };
//         reader.readAsBinaryString(selectedFile);
//     });
// });

var oFileIn;
function voidConvo() {
    oFileIn = document.getElementById('fileUploader');
    if (oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
}

function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();

    // Ready The Event For When A File Gets Selected
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, { type: 'binary' });
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function (sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            //$("#my_file_output").html(sCSV);
            document.getElementById('result').innerHTML = sCSV;

            console.log(oJS)
        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}
