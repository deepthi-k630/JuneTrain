variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "my-default-bucket"
  
}

variable "region" {
  description = "The AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "The deployment environment"
  type        = string
  default     = "dev"
  
}