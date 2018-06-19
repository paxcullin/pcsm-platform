echo "SERVICE: $1"
echo "STAGE: $2"
echo "REGION: $3"
echo "Object name: $4"
echo "Plain text: $5"

keyid=`printenv $2_AWS_KMS_KEY_ARN`
echo "AWS key-id: $keyid"

secretsBucket="$1-$2-secrets"
echo "S3 secrets bucket: $secretsBucket"

aws s3api create-bucket --bucket $secretsBucket --region $3 --create-bucket-configuration LocationConstraint=$3

aws kms encrypt --key-id $keyid --region $3 --plaintext $5 | \
  python -c "import sys, json; print json.load(sys.stdin)['CiphertextBlob']" > $4 &&
  aws s3 mv $4 "s3://$secretsBucket/$4"
