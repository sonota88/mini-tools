(function(){

   function _readFile(path, opts){
     var fis = new FileInputStream(new File(path));
     var reader = new java.io.InputStreamReader(fis, "UTF-8");
     var br = new BufferedReader(reader);
     var sb = new java.lang.StringBuilder();

     var line;
     while(true){
       line = br.readLine();
       if(line === null){
         break;
       }
       sb.append(line + "\n");
     }

     br.close();
     reader.close();
     fis.close();

     return sb.toString();
   }

   function _load(str) {
     var src = _readFile(str);

     var oldFilename = engine.get(engine.FILENAME);
     engine.put(engine.FILENAME, str);
     try {
       engine.eval(
         "(function(){ "
         + src
         + " })();"
       );
     } finally {
       engine.put(engine.FILENAME, oldFilename);
     }
   }

   function require(path){
     exports = {};
     var _path;
     if(path.match(/\.js/)){
       _path = path;
     }else{
       _path = path + ".js";
     }
     _load(_path);

     var obj;
     for(var k in exports){
       obj = exports[k];
     }
     exports = {};
     return obj;
   }

   // ----------------

   var toplevel = this;
   toplevel.exports = {};
   toplevel.require = require;
 })();
