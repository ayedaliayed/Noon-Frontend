import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

const httpLoaderFactory =(http:HttpClient) => new TranslateHttpLoader(http,'assets/i18n/','.json');


const translateLoader:Provider ={
  provide:TranslateLoader,
  useFactory:httpLoaderFactory,
  deps:[HttpClient]
}



const translateCompilerFactory =() => new TranslateMessageFormatCompiler();
const translateCompiler:Provider ={
  provide:TranslateCompiler,
  useFactory:translateCompilerFactory
}


@NgModule()
export class AppTranslateModule { 
  static forRoot():ModuleWithProviders<AppTranslateModule>{
    return TranslateModule.forRoot({
      loader:translateLoader,
      compiler:translateCompiler
    })
  }
static forChild():ModuleWithProviders<AppTranslateModule>{
  return TranslateModule.forRoot({
    loader:translateLoader,
    compiler:translateCompiler,
    isolate:false
  })
}
}
