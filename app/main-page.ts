/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import {FilePicker, } from "nativescript-file-picker";
import {Observable} from "data/observable";
var application = require("application");
import {knownFolders} from 'file-system';
import {openUrl, ios} from "utils/utils"
import {isAndroid} from "platform"
declare var android:any;
declare var java:any;

var tmpobservable:Observable;
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    tmpobservable = new Observable()

    tmpobservable.set("multiple", false);
    page.bindingContext = tmpobservable;
}

export function onTap(){
    

        if(isAndroid){

            var filepicker =  new FilePicker();
            filepicker.allowMultiple=false;
            filepicker.show().then(function(args){
                console.log(args);
                var filePath=""+args[0];
                console.log("------------file path---------------")
                console.log(filePath);
                // First option 
                openUrl(filePath);

                

                // Secon option 

                //  try
                // {

                //     var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                //     intent.setDataAndType(android.net.Uri.parse(filePath.trim()),"application/*");
                //     intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                //     application.android.currentContext.startActivity(intent);

                // }
                // catch (e)
                // {
                //     console.log("Error");
                //     console.log(e);
                // }

            })
        
        }
        else{
            var documents = knownFolders.currentApp();
            var filePath = documents.path+"/pdf-sample.pdf";
            console.log("------------------------file path-----------------------------");
            console.log(filePath);
            ios.openFile(filePath);
        }

}