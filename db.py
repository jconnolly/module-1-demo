import asyncio
import aiosqlite

class ValidationError(Exception):
	def __init__(self, msg):
		super().__init__(msg)
		self.code = 'VALID_ERR'

async def registerUser(db_path, full_name, email_address, account_status=None, internal_clearance_level=None):
	"""
	Registers a new user if email_address does not exist.
	Raises ValidationError if user exists.
	Only full_name and email_address are required; others use defaults.
	"""
	async with aiosqlite.connect(db_path) as db:
		db.row_factory = aiosqlite.Row
		# Check for existing user
		async with db.execute("SELECT id FROM users WHERE email_address = ?", (email_address,)) as cursor:
			row = await cursor.fetchone()
			if row:
				raise ValidationError("User with this email already exists.")
		# Insert new user
		fields = ["full_name", "email_address"]
		values = [full_name, email_address]
		placeholders = ["?", "?"]
		if account_status is not None:
			fields.append("account_status")
			values.append(account_status)
			placeholders.append("?")
		if internal_clearance_level is not None:
			fields.append("internal_clearance_level")
			values.append(internal_clearance_level)
			placeholders.append("?")
		sql = f"INSERT INTO users ({', '.join(fields)}) VALUES ({', '.join(placeholders)})"
		await db.execute(sql, tuple(values))
		await db.commit()
		return True
