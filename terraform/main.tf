terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0-beta3"
    }
  }

  # backend "s3" {
  #   bucket = "thales-remote-state-app"
  #   key    = "aws-vpc/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      owner      = "thales eduardo"
      managed-by = "terraform"
    }
  }
}


