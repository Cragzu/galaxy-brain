resource "aws_iam_role" "codebuild_role" {
  name = "galaxy-brain-dubhacks-codebuild_role"

  assume_role_policy = <<EOF
{
            "Version": "2012-10-17",
            "Statement": [
                {
                "Effect": "Allow",
                "Principal": {
                    "Service": "codebuild.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
                }
            ]
}
    EOF
}

resource "aws_iam_role" "codepipeline_role" {
  name = "galaxy-brain-dubhacks-codepipeline_role"

  assume_role_policy = <<EOF
{
            "Version": "2012-10-17",
            "Statement": [
                {
                "Effect": "Allow",
                "Principal": {
                    "Service": "codepipeline.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
                }
            ]
}
    EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name = "galaxy-brain-dubhacks-codebuild_policy"
  role = aws_iam_role.codebuild_role.id

  policy = <<EOF
{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "CodeBuildDefaultPolicy",
                    "Effect": "Allow",
                    "Action": [
                        "codebuild:*",
                        "iam:PassRole"
                    ],
                    "Resource": "*"      
                },
                {
                    "Sid": "CloudWatchLogsAccessPolicy",
                    "Effect": "Allow",
                    "Action": [
                        "logs:CreateLogGroup",
                        "logs:CreateLogStream",
                        "logs:PutLogEvents",
                        "logs:FilterLogEvents",
                        "logs:GetLogEvents"
                    ],
                    "Resource": "*"
                },
                {
                    "Sid": "S3AccessPolicy",
                    "Effect": "Allow",
                    "Action": [
                        "s3:CreateBucket",
                        "s3:GetObject",
                        "s3:List*",
                        "s3:PutObject"
                    ],
                    "Resource": "*"
                },
                {
                    "Sid": "S3BucketIdentity",
                    "Effect": "Allow",
                    "Action": [
                        "s3:GetBucketAcl",
                        "s3:GetBucketLocation"
                    ],
                    "Resource": "*"
                }
            ]
}
    EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "galaxy-brain-dubhacks-codepipeline_policy"
  role = aws_iam_role.codepipeline_role.id

  policy = <<EOF
{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect":"Allow",
                    "Action": [
                        "s3:GetObject",
                        "s3:GetObjectVersion",
                        "s3:GetBucketVersioning",
                        "s3:PutObject",
                        "s3:GetObjectMetadata"
                    ],
                    "Resource": [
                        "${aws_s3_bucket.dubhacks_bucket.arn}",
                        "${aws_s3_bucket.dubhacks_bucket.arn}/*"
                    ]
                    },
                    {
                        "Effect": "Allow",
                        "Action": [
                            "codebuild:BatchGetBuilds",
                            "codebuild:StartBuild"
                    ],
                    "Resource": "*"
                },
                 {
                    "Effect": "Allow",
                    "Action": [
                        "s3:*"
                    ],
                    "Resource": [
                        "arn:aws:s3:::galaxy-brain-dubhacks",
                        "arn:aws:s3:::galaxy-brain-dubhacks/*"
                    ]
                
                }
            ]
}
    EOF
}

resource "aws_s3_bucket" "dubhacks_bucket" {
  bucket        = "galaxy-brain-dubhacks"
  acl           = "private"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_policy" "dubhacks_bucket_policy" {
  bucket = aws_s3_bucket.dubhacks_bucket.id

  policy = <<EOF
{
             "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "PublicReadGetObject",
                        "Effect": "Allow",
                        "Principal": "*",
                        "Action": [
                            "s3:GetObject",
                            "s3:PutObject"
                        ],
                        "Resource": [
                             "arn:aws:s3:::galaxy-brain-dubhacks",
                            "arn:aws:s3:::galaxy-brain-dubhacks/*"
                        ]
                    }
            ]
}
    EOF
}

resource "aws_codebuild_project" "dubhacks-project" {
  name          = "galaxy-brain-dubhacks"
  description   = "pipeline for galaxy brain project"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild_role.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:2.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"

  }

  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/Cragzu/galaxy-brain.git"
    git_clone_depth = 1

    git_submodules_config {
      fetch_submodules = true
    }

    buildspec = "buildspec.yml"
  }
}

resource "aws_codepipeline" "galaxy_brain_pipeline" {
  name     = "galaxy_brain_pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.dubhacks_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        "Owner"      = "Cragzu",
        "Repo"       = "galaxy-brain",
        "Branch"     = "master",
        "OAuthToken" = var.GITHUB_TOKEN

      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        "ProjectName" = "galaxy-brain-dubhacks"
      }

    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "S3"
      input_artifacts = ["build_output"]
      version         = "1"

      configuration = {
        "BucketName" = "galaxy-brain-dubhacks"
        "CannedACL"  = "public-read"
        "Extract"    = "true"
      }
    }
  }

}
