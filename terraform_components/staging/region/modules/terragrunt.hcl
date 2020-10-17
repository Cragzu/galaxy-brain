locals {
    region_vars = read_terragrunt_config(find_in_parent_folders("region.hcl"))

    state_vars = read_terragrunt_config(find_in_parent_folders("bucket.hcl"))

    bucket = local.state_vars.locals.bucket

    aws_region = local.region_vars.locals.aws_region 
}

generate "provider" {
    path = "provider.tf"
    if_exists = "overwrite_terragrunt"
    contents = <<EOF
    provider "aws" {
        region = "${local.aws_region}"
    }
    EOF
}

remote_state {
    backend = "s3"
    generate = {
        path = "backend.tf"
        if_exists = "overwrite_terragrunt"

    }
    config = {
        bucket = local.bucket
        key = "${path_relative_to_include()}/terraform.tfstate"
        region = local.aws_region
        encrypt = true
    }
}