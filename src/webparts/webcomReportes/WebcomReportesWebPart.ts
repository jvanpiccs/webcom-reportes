import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { spfi, SPFx } from '@pnp/sp';

import * as strings from 'WebcomReportesWebPartStrings';
import {
  WebcomReportes,
  IWebcomReportesProps,
} from './components/WebcomReportes';

export interface IWebcomReportesWebPartProps {
  description: string;
}

export default class WebcomReportesWebPart extends BaseClientSideWebPart<IWebcomReportesWebPartProps> {
  private _isDarkTheme: boolean = false;

  protected async onInit(): Promise<void> {
    await super.onInit();
    const sp = spfi().using(SPFx(this.context));
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IWebcomReportesProps> =
      React.createElement(WebcomReportes, {
        isDarkTheme: this._isDarkTheme,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty(
      '--linkHovered',
      semanticColors.linkHovered
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
