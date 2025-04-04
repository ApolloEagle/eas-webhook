import { Platform, Status } from "./enums";

export interface ResponseBody {
  platform: Platform;
  status: Status;
  metadata: Metadata;
  artifacts: Artifacts;
  buildDetailsPageUrl: string;
  appId: string;
  id: string;
}

export interface Metadata {
  buildProfile: string;
  appVersion: string;
  appBuildVersion: string;
}

export interface Artifacts {
  buildUrl: string;
}

export interface PlainText {
  type: "plain_text";
  text: string;
}

export interface Mrkdwn {
  type: "mrkdwn";
  text: string;
}

export interface ButtonElement {
  type: "button";
  text: PlainText;
  url: string;
}

export interface HeaderBlock {
  type: "header";
  text: PlainText;
}

export interface SectionBlock {
  type: "section";
  fields?: Mrkdwn[];
}

export interface ActionsBlock {
  type: "actions";
  elements: ButtonElement[];
}

export interface ImageBlock {
  type: "image";
  image_url: string;
  alt_text: string;
}

export type Block = HeaderBlock | SectionBlock | ActionsBlock | ImageBlock;
