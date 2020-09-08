
push:
	gcloud config set project banked
	gcloud builds submit --tag gcr.io/banked/banked-example-store

deploy:
	gcloud config set project banked
	gcloud run deploy example-store --image gcr.io/banked/banked-example-store --platform=managed  --region=europe-west4 --update-env-vars GCP_PROJECT_ID=banked --port 3000
