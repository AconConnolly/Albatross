import React from "react";
import CustomizedTables from "./CustomizedTables";

function createData(age, day, weekEnd) {
    return { age, day, weekEnd };
  }
  
  export const courses = {
   shag: [
    createData("Regular", "$56.00", "$57.00"),
    createData("Senior (65+)", "$41.50", "$57.00"),
    createData("Junior (4-17)", "$34.00", "$34.00"),
    //41.50 and 41.50
  ],
  
   maple: [
    createData("Regular", "$56.00", "$63.00"),
    createData("Senior (65+)", "$48.00", "$63.00"),
    createData("Junior (4-17)", "$39.00", "$39.00"),
    //Twighlight 48 and 48
  ],
   mccall: [
    createData("Regular", "$51.00", "$60.00"),
    createData("Senior (65+)", "$44.00", "$60.00"),
    createData("Junior (4-17)", "$35.50", "$35.50"),
    //Twighight 44 and 44
  ],
   mccall9: [
    createData("Regular", "$16.50", "$16.50"),
    createData("Senior (65+)", "$14.50", "$14.50"),
    createData("Junior (4-17)", "$11.50", "$11.50"),
    //Twightlight 10 and 10
  ],
  
   earlyBird: [createData("All ages", "$41.50", "$57.00")],
  
   valley9: [
    createData("Regular", "$28.00", "$32.00"),
    createData("Senior (65+)", "$24.00", "$32.00"),
    createData("Junior (4-17)", "$20.00", "$20.00"),
    //18.50 and 18.50
  ],
   confed: [
    createData("Regular", "$34.00", "$38.00"),
    createData("Senior (65+)", "$30.00", "$38.00"),
    createData("Junior (4-17)", "$23.75", "$23.75"),
    //23 and 23
  ],
  lake: [
    createData("Regular", "$34.00", "$38.00"),
    createData("Senior (65+)", "$30.00", "$38.00"),
    createData("Junior (4-17)", "$23.75", "$23.75"),
    //23 and 23
  ],
};

  