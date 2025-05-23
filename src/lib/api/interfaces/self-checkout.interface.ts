// Generated from Swagger on 2025-05-22T13:43:29.107Z

import { FutureCapacityResponseDto } from "./common.interface";

export interface CapacityCreationEntitiesResponseDto {
  capacityBySlotsNeeded: CapacityBySlotsNeededResponseDto[];
}

export interface CapacityBySlotsNeededResponseDto {
  slotsNeeded: number;
  capacity: FutureCapacityResponseDto[];
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface SelfCheckoutListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: SelfCheckoutListResponseDto[];
}

export interface SelfCheckoutListResponseDto {
  _id: ObjectId;
  mail: string;
  name: string;
  allowedJobsCount: number;
  newCustomerDate: string;
  createdAt: string;
}

export interface CreateSelfCheckoutRequestDto {
  firstName: string;
  lastName: string;
  name: string;
  allowedJobsCount: number;
  newCustomerDate: string;
  vatId: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  iban?: string;
  bic?: string;
  invoiceMail: string;
  phone: string;
}

export interface SelfCheckoutDetailsResponseDto {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  mail: string;
  name: string;
  allowedJobsCount: number;
  newCustomerDate: string;
  vatId: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  invoiceMail: string;
  iban: string;
  bic: string;
  phone: string;
  ip: string;
  createdAt: string;
  updatedAt: string;
  selectableEntities: SelfCheckoutSelectableEntitiesResponseDto;
}

export interface ObjectId {}

export interface SelfCheckoutSelectableEntitiesResponseDto {
  capacityBySlotsNeeded: CapacityBySlotsNeededResponseDto[];
}

export interface UpdateSelfCheckoutRequestDto {
  firstName?: string;
  lastName?: string;
  name?: string;
  allowedJobsCount?: number;
  newCustomerDate?: string;
  vatId?: string;
  street?: string;
  houseNumber?: string;
  postCode?: string;
  city?: string;
  country?: string;
  iban?: string;
  bic?: string;
  invoiceMail?: string;
  phone?: string;
}
